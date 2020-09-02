export interface UserUIProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (anchorEl: HTMLButtonElement) => void;
  onClose: () => void;
}
