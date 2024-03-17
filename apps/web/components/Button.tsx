import Spinner from "./Spinner";

type Props = {
  isSubmitting?: boolean;
  children: React.ReactNode;
  submittingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  isSubmitting = false,
  children,
  submittingText = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className="bg-black text-white py-8px px-16px rounded-4px font-600"
    >
      {isSubmitting ? (
        <div className="text-inherit flex items-center gap-8px text-14px">
          {submittingText} <Spinner />
        </div>
      ) : (
        <p className="text-inherit text-14px">{children}</p>
      )}
    </button>
  );
}
