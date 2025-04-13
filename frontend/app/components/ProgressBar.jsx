export default function ProgressBar({ step }) {
    const steps = ['Ad Info', 'Contact Info', 'Payment'];
    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${
                step >= index + 1 ? 'bg-[#ff3399] text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            <p className="text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>
    );
  }
  