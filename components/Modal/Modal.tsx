type ModalProps = {
  onClose?: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div>
      <div>{children}</div>

      {onClose && (
        <button onClick={onClose}>Close</button>
      )}
    </div>
  );
}