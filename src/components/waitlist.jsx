import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const neighborhoods = [
  "Rodgers Park / Loyola",
  "Lincoln Square / Andersonville",
  "Lakeview / Wrigley",
  "Lincoln Park / Old Town",
  "Wicker / Bucktown / Logan Square",
  "Pilsen / Bridgeport",
  "West Loop / Fulton Market",
  "River North / Gold Coast",
  "The Loop",
];

export default function Waitlist() {
  const [expanded, setExpanded] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    firstName: "",
    age: "",
    gender: "",
    sexualIdentification: [],
    primaryNeighborhood: "",
    locationType: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
  
    const normalized = digits.startsWith("1") ? digits.slice(1) : digits;
    const area = normalized.slice(0, 3);
    const middle = normalized.slice(3, 6);
    const last = normalized.slice(6, 10);
  
    let formatted = "+1";
    if (area) {
      formatted += ` (${area}`;
      if (normalized.length > 3) formatted += `)`; // only add closing ) if middle digits exist
    }
    if (middle) formatted += ` ${middle}`;
    if (last) formatted += `-${last}`;
  
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone") {
      setFormData((prev) => {
        const prevRawDigits = prev.phone.replace(/\D/g, "");
        const newRawDigits = value.replace(/\D/g, "");
  
        const isDeleting = newRawDigits.length < prevRawDigits.length;
        const newPhone = isDeleting ? value : formatPhoneNumber(value);
  
        return { ...prev, phone: newPhone };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be in the format +1 (XXX) XXX-XXXX.";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 18) {
      newErrors.age = "You must be at least 18 years old.";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }
    if (!formData.sexualIdentification[0]) {
      newErrors.sexualIdentification = "Please select a sexual identification.";
    }
    if (!formData.primaryNeighborhood) {
      newErrors.primaryNeighborhood = "Please select a neighborhood.";
    }
    if (!formData.locationType) {
      newErrors.locationType = "Please select a location type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, "users"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setFormData({
        phone: "",
        firstName: "",
        age: "",
        gender: "",
        sexualIdentification: [],
        primaryNeighborhood: "",
        locationType: "",
      });
      setErrors({});
      setExpanded(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="font-hind font-obv-light flex items-center justify-center h-full text-white px-4">
      <AnimatePresence mode="wait">
        {submitted && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-2 font-obv-light">You're on the list ✅</h2>
            <p className="text-white/80 font-obv-light">
              Thanks for signing up. We'll be in touch soon!
            </p>
          </motion.div>
        )}

        {expanded && !submitted && (
          <motion.form
            layoutId="waitlist"
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className="w-full max-w-md space-y-4 mt-8 p-6 font-obv-light"
          >
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white placeholder-white/60 focus:outline-none rounded-lg"
            />
            {errors.firstName && <p className="text-red-300 text-sm">{errors.firstName}</p>}

            <input
              name="phone"
              type="tel"
              maxLength={18}
              placeholder="Phone Number (e.g., +1 312 555 1234)"
              value={formData.phone}
              onChange={handleChange}
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white placeholder-white/60 focus:outline-none rounded-lg"
            />
            {errors.phone && <p className="text-red-300 text-sm">{errors.phone}</p>}

            <div className="flex flex-row">
              <input
                name="age"
                type="number"
                min={18}
                placeholder="Age (18+)"
                value={formData.age}
                onChange={handleChange}
                className="font-obv-light w-full px-4 mr-2 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white placeholder-white/60 focus:outline-none rounded-lg"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="font-obv-light w-full px-4 ml-2 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white focus:outline-none rounded-lg"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Nonbinary</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            {errors.age && <p className="text-red-300 text-sm">{errors.age}</p>}
            {errors.gender && <p className="text-red-300 text-sm">{errors.gender}</p>}

            <select
              name="sexualIdentification"
              value={formData.sexualIdentification[0] || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sexualIdentification: [e.target.value],
                }))
              }
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white focus:outline-none rounded-lg"
            >
              <option value="">Sexual Identification</option>
              <option value="Straight">Straight</option>
              <option value="Gay">Gay</option>
              <option value="Lesbian">Lesbian</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Pansexual">Pansexual</option>
              <option value="Queer">Queer</option>
              <option value="Other">Other</option>
            </select>
            {errors.sexualIdentification && <p className="text-red-300 text-sm">{errors.sexualIdentification}</p>}

            <select
              name="primaryNeighborhood"
              value={formData.primaryNeighborhood}
              onChange={handleChange}
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white focus:outline-none rounded-lg"
            >
              <option value="">Favorite Neighborhood</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {errors.primaryNeighborhood && <p className="text-red-300 text-sm">{errors.primaryNeighborhood}</p>}

            <div>
              <label className="text-sm font-obv-light text-white mb-1 block">
                Do you live in Chicago or a suburb?
              </label>
              <div className="flex space-x-4">
                {["Chicago", "Suburb"].map((value) => (
                  <label key={value} className="text-white font-obv-light">
                    <input
                      type="radio"
                      name="locationType"
                      value={value}
                      checked={formData.locationType === value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {value}
                  </label>
                ))}
              </div>
              {errors.locationType && <p className="text-red-300 text-sm">{errors.locationType}</p>}
            </div>

            <button
              type="submit"
              className="w-full font-obv-light backdrop-blur-md bg-[#1D225B] hover:cursor-pointer text-white font-medium py-2 px-4 border border-white/30 rounded-lg"
            >
              Join the List
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}