import { Modal as AntModal, Typography, Col, Space } from 'antd';
import { ReactNode, FC } from 'react';

interface ModalProps {
  title: string;
  titleContent: ReactNode;
  onClose: () => void;
  children: ReactNode;
  wrapClassName?: string;
}

export const Modal: FC<ModalProps> = ({
  onClose,
  title,
  titleContent,
  children,
  wrapClassName,
}) => {
  return (
    <AntModal
      wrapClassName={wrapClassName}
      title={<ModalTitle title={title}>{titleContent}</ModalTitle>}
      width="80%"
      onCancel={onClose}
      footer={null}
      visible
      destroyOnClose
      centered
    >
      {children}
    </AntModal>
  );
};

interface ModalTitleProps {
  title: string;
  children?: ReactNode;
}

const ModalTitle: FC<ModalTitleProps> = ({ title, children }) => {
  const { Title } = Typography;
  return (
    <Col>
      <Title level={4}>{title}</Title>
      <Space size={48} align="center" direction="vertical">
        {children}
      </Space>
    </Col>
  );
};
