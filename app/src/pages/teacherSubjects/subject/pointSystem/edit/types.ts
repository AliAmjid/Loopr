export interface EditIndexProps {
  open: boolean;
  onClose: () => void;
}

export interface EditProps {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}
