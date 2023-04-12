import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  const buttonStyles = className ? `${styles.button} ${className}` : styles.button;

  return (
    <button className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
}
