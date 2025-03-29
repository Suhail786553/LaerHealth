import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("/api/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setGeneratedOtp(data.otp);
                setStep(2);
                setError("");
            } else {
                setError("Error sending OTP");
            }
        } catch (err) {
            setError("Failed to connect to server");
        }
        setLoading(false);
    };

    const verifyOtp = () => {
        setLoading(true);
        if (otp === generatedOtp?.toString()) {
            setStep(3);
            setError("");
        } else {
            setError("Invalid OTP");
        }
        setLoading(false);
    };

    const handleSignup = async () => {
        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            window.location.href = "/";
        } catch (error) {
            handleFirebaseError(error);
        }
        setLoading(false);
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleFirebaseError = (error) => {
        switch (error.code) {
            case "auth/email-already-in-use":
                setError("Email already registered");
                break;
            case "auth/invalid-email":
                setError("Invalid email address");
                break;
            case "auth/weak-password":
                setError("Password must be at least 6 characters");
                break;
            default:
                setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
                
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full p-2 border mt-4 rounded text-black"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <button 
                            onClick={sendOtp} 
                            className={`w-full bg-blue-600 text-white p-2 rounded mt-4 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full p-2 border mt-4 rounded text-black"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                        />
                        <button 
                            onClick={verifyOtp} 
                            className={`w-full bg-green-600 text-white p-2 rounded mt-4 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="w-full p-2 border mt-4 rounded text-black"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <input
                            type="password"
                            placeholder="Enter Password (min 6 characters)"
                            className="w-full p-2 border mt-4 rounded text-black"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button 
                            onClick={handleSignup} 
                            className={`w-full bg-blue-600 text-white p-2 rounded mt-4 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Complete Signup"}
                        </button>
                    </>
                )}

                <p className="text-center mt-4 text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
                </p>
            </div>
        </div>
    );
}
