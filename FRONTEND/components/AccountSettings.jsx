import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountSettings.css";

const AccountSettings = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(user || null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifyTrips: true,
    notifyOffers: true,
    notifyNews: false,
    notifyPartners: false,
    profileVisibility: "public",
    dataSharing: "minimal"
  });
  const [activeTab, setActiveTab] = useState("personal");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          credentials: "include",
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          initializeFormData(data);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
          setMessage({
            text: "Failed to load your account information. Please try again.",
            type: "error"
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage({
          text: "An error occurred. Please check your connection and try again.",
          type: "error"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      initializeFormData(user);
      setIsLoading(false);
    } else {
      fetchUserData();
    }
  }, [user]);

  const initializeFormData = (data) => {
    setFormData({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
      country: data.country || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      notifyTrips: data.preferences?.notifyTrips !== false,
      notifyOffers: data.preferences?.notifyOffers !== false,
      notifyNews: data.preferences?.notifyNews === true,
      notifyPartners: data.preferences?.notifyPartners === true,
      profileVisibility: data.privacy?.profileVisibility || "public",
      dataSharing: data.privacy?.dataSharing || "minimal"
    });
    setPhotoPreview(data.photo || null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePersonalInfo = () => {
    if (!formData.name.trim()) {
      setMessage({ text: "Name is required", type: "error" });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setMessage({ text: "Valid email is required", type: "error" });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!formData.currentPassword) {
      setMessage({ text: "Current password is required", type: "error" });
      return false;
    }
    if (formData.newPassword && formData.newPassword.length < 8) {
      setMessage({ text: "New password must be at least 8 characters", type: "error" });
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return false;
    }
    return true;
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    if (!validatePersonalInfo()) return;
    setIsLoading(true);
    try {
      let dataToSend;
      if (photoFile) {
        dataToSend = new FormData();
        dataToSend.append('photo', photoFile);
        Object.keys(formData).forEach(key => {
          if (!key.includes('Password') && !key.includes('notify') && !key.includes('profile') && !key.includes('data')) {
            dataToSend.append(key, formData[key]);
          }
        });
      } else {
        dataToSend = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        };
      }

      const headers = photoFile ? {} : { 'Content-Type': 'application/json' };

      const response = await fetch('http://localhost:3000/api/user/update-profile', {
        method: 'PUT',
        credentials: 'include',
        headers,
        body: photoFile ? dataToSend : JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setMessage({ text: "Personal information updated successfully!", type: "success" });
      } else {
        const error = await response.json();
        setMessage({ text: error.message || "Failed to update profile", type: "error" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/user/change-password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      if (response.ok) {
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setMessage({ text: "Password changed successfully!", type: "success" });
      } else {
        const error = await response.json();
        setMessage({ text: error.message || "Failed to change password", type: "error" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const notificationPreferences = {
        notifyTrips: formData.notifyTrips,
        notifyOffers: formData.notifyOffers,
        notifyNews: formData.notifyNews,
        notifyPartners: formData.notifyPartners
      };

      const response = await fetch('http://localhost:3000/api/user/update-preferences', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences: notificationPreferences })
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setMessage({ text: "Notification preferences updated successfully!", type: "success" });
      } else {
        const error = await response.json();
        setMessage({ text: error.message || "Failed to update preferences", type: "error" });
      }
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const privacySettings = {
        profileVisibility: formData.profileVisibility,
        dataSharing: formData.dataSharing
      };

      const response = await fetch('http://localhost:3000/api/user/update-privacy', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ privacy: privacySettings })
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setMessage({ text: "Privacy settings updated successfully!", type: "success" });
      } else {
        const error = await response.json();
        setMessage({ text: error.message || "Failed to update privacy settings", type: "error" });
      }
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/user/delete-account', {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          navigate('/login');
        } else {
          const error = await response.json();
          setMessage({ text: error.message || "Failed to delete account", type: "error" });
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        setMessage({ text: "An error occurred. Please try again.", type: "error" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="account-settings">
      {isLoading && <p>Loading...</p>}
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
      {/* Add your tab navigation and forms here */}
    </div>
  );
};

export default AccountSettings;
