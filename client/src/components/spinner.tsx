import SpinnerIcon from '../../public/static/spinner.svg';

const Spinner: React.FC = () => {
  return (
    <div className="animate-spin" title="loading animation">
      <SpinnerIcon className="w-auto h-4" />
    </div>
  );
};

export default Spinner;
