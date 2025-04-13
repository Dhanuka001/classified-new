'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1AdDetails from '../components/Step1AdDetails';
import Step2ContactInfo from '../components/Step2ContactInfo';
import Step3Payment from '../components/Step3Payment';
import ProgressBar from '../components/ProgressBar';
import { toast } from 'react-toastify';

export default function PostAdPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: null, // Changed to store file object
    phone: '',
    whatsapp: '',
    telegram: '',
    amount: '',
    referenceNote: '',
    bankSlip: null, // Added for bank slip
  });

  const [orderId, setOrderId] = useState(null);
  const [posting, setPosting] = useState(false);
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.title.trim() || !formData.description.trim()) {
        toast.error('Title and description are required.');
        return false;
      }
      if (!formData.image) {
        toast.error('Please upload an image.');
        return false;
      }
      return true;
    }
    if (step === 2) {
      const phoneRegex = /^\+?\d{10,12}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error('Please enter a valid phone number.');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
        toast.error('Please enter a valid payment amount.');
        return false;
      }
      if (!formData.bankSlip) {
        toast.error('Please upload a bank slip.');
        return false;
      }
      return true;
    }
    return true;
  };

  const nextStep = async () => {
    if (!validateStep()) return;

    if (step === 2) {
      setPosting(true);
      try {
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key === 'image' || key === 'bankSlip') {
            if (formData[key]) formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        toast.success('✅ Ad created. Proceed to payment...');
        setOrderId(data.orderId);
        setFormData((prev) => ({ ...prev, orderId: data.orderId }));
        setStep(3);
      } catch (err) {
        toast.error(err.message || 'Failed to post ad.');
      } finally {
        setPosting(false);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = () => {
    if (!validateStep()) return;
    setSubmittingPayment(true);
    toast.success('🎉 Success! Redirecting to My Account...');
    setTimeout(() => {
      router.push('/account');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-white bg-[#121212]">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#ff3399] mb-6">
        📢 Post Your Ad / ඔබේ දැන්වීම පළ කරන්න
      </h1>

      <ProgressBar step={step} />

      {step === 1 && <Step1AdDetails data={formData} onChange={handleChange} />}
      {step === 2 && <Step2ContactInfo data={formData} onChange={handleChange} />}
      {step === 3 && (
        <Step3Payment
          data={formData}
          onChange={handleChange}
          orderId={orderId}
          onSubmit={handleFinalSubmit}
          submitting={submittingPayment}
        />
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={nextStep}
            disabled={posting}
            className={`px-4 py-2 rounded text-white ml-auto ${
              posting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#ff3399] hover:bg-pink-600'
            }`}
          >
            {posting ? 'Posting...' : 'Continue →'}
          </button>
        )}
      </div>
    </div>
  );
}