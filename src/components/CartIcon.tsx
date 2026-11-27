interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = "h-4 w-4" }: CartIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .625.502h9.166v-1.25H7.036l-.5-2.5h8.298a.625.625 0 0 0 .613-.502l1.25-6.25H3.946l-.5-1.746Z" />
      </g>
    </svg>
  );
}