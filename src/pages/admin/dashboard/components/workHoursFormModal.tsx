import { Input, Card, Form, Button, Row, Modal, TimePicker, notification } from 'antd';
import moment, { Moment } from 'moment';
import { FC } from 'react';

import { WorkHours } from '@/features/user/types';
import { updateWorkHours } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';

export interface WorkHoursFormModalProps {
  userId: string | null | undefined;
  visible: boolean;
  onClose: () => void;
}

export const WorkHoursFormModal: FC<WorkHoursFormModalProps> = ({ visible, onClose, userId }) => {
  const dispatch = useAppDispatch();
  const workingHours = useAppSelector((state) => state.user.workingHours);

  const onFinish = (values: { workTime: Moment[]; hours: number }) => {
    if (userId) {
      const { hours, workTime } = values;
      const startTime = workTime[0];
      const endTime = workTime[1];
      if (hours > moment.duration(endTime.diff(startTime)).asHours()) {
        notification.error({
          message: 'Error',
          description: 'Hours cannot be greater than the difference between start and end time',
        });
        return;
      }
      dispatch(
        updateWorkHours({
          id: userId,
          user_id: userId,
          start_time: startTime.format('HH:mm'),
          end_time: endTime.format('HH:mm'),
          hours,
        })
      );
    }
    onClose();
  };

  if (!userId) {
    return null;
  }
  const initValue = workingHours.find((workHours) => workHours.user_id === userId) as WorkHours;

  const splitStartTime = initValue.start_time.split(/:/);
  const startTime = moment()
    .hours(parseInt(splitStartTime[0]))
    .minutes(parseInt(splitStartTime[1]))
    .seconds(0)
    .milliseconds(0);

  const splitEndTime = initValue.end_time.split(/:/);
  const endTime = moment()
    .hours(parseInt(splitEndTime[0]))
    .minutes(parseInt(splitEndTime[1]))
    .seconds(0)
    .milliseconds(0);

  return (
    <Modal
      title={'Update Working Hours'}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
    >
      <Card>
        <Form
          name="work-hours"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            initialValue={[startTime, endTime]}
            label="Work Time"
            name="workTime"
            rules={[{ required: true, message: 'Please input Time Range!' }]}
          >
            <TimePicker.RangePicker use12Hours format="HH:mm" />
          </Form.Item>

          <Form.Item
            initialValue={initValue?.hours}
            label="Hours"
            name="hours"
            rules={[{ required: true, message: 'Please input Work Hours!' }]}
          >
            <Input type="number" max={24} min={1} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Row justify="center">
              <Button size="large" type="primary" htmlType="submit">
                Save
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
