
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile, useUpdateProfile, useUploadLogo } from "@/hooks/useProfile";
import { Building2, Upload, X, Loader2, Phone, Plus, Mail } from "lucide-react";
import { toast } from "sonner";

const ProfileTab = () => {
  const { data: profile, isLoading, error } = useProfile();
  const updateProfile = useUpdateProfile();
  const uploadLogo = useUploadLogo();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(profile?.logo || null);

  const [formData, setFormData] = useState({
    businessName: profile?.businessName || "",
    registrationNumber: profile?.registrationNumber || "",
    address: profile?.address || "",
    contactNumbers: profile?.contactNumbers || [""],
    emailAddresses: profile?.emailAddresses || [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactNumberChange = (index: number, value: string) => {
    const newNumbers = [...formData.contactNumbers];
    newNumbers[index] = value;
    setFormData((prev) => ({
      ...prev,
      contactNumbers: newNumbers,
    }));
  };

  const handleAddContactNumber = () => {
    setFormData((prev) => ({
      ...prev,
      contactNumbers: [...prev.contactNumbers, ""],
    }));
  };

  const handleRemoveContactNumber = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      contactNumbers: prev.contactNumbers.filter((_, i) => i !== index),
    }));
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.emailAddresses];
    newEmails[index] = value;
    setFormData((prev) => ({
      ...prev,
      emailAddresses: newEmails,
    }));
  };

  const handleAddEmail = () => {
    setFormData((prev) => ({
      ...prev,
      emailAddresses: [...prev.emailAddresses, ""],
    }));
  };

  const handleRemoveEmail = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      emailAddresses: prev.emailAddresses.filter((_, i) => i !== index),
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      await uploadLogo.mutateAsync(file);
      toast.success("Logo uploaded successfully");
    } catch {
      toast.error("Failed to upload logo");
      setLogoPreview(profile?.logo || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.businessName ||
      !formData.registrationNumber ||
      !formData.address ||
      formData.contactNumbers.some((num) => !num) ||
      formData.emailAddresses.some((email) => !email)
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Phone validation
    const phoneRegex = /^\d{10,}$/;
    if (!formData.contactNumbers.every((num) => phoneRegex.test(num.replace(/\D/g, "")))) {
      toast.error("Please enter valid phone numbers (at least 10 digits)");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailAddresses.every((email) => emailRegex.test(email))) {
      toast.error("Please enter valid email addresses");
      return;
    }

    try {
      await updateProfile.mutateAsync({
        businessName: formData.businessName,
        registrationNumber: formData.registrationNumber,
        address: formData.address,
        contactNumbers: formData.contactNumbers,
        emailAddresses: formData.emailAddresses,
      });

      toast.success("Business profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update business profile");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-destructive font-semibold">Error loading profile</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {error instanceof Error ? error.message : "An error occurred while loading profile"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Business Profile</h2>
          <p className="text-sm text-muted-foreground">Manage your company information</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            Edit Profile
          </Button>
        )}
      </div>

      {isEditing ? (
        /* Edit Form */
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Logo Upload Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                  Company Logo
                </h3>
                <div className="flex items-center gap-6">
                  {logoPreview ? (
                    <div className="relative w-24 h-24 rounded-lg border-2 border-primary/30 overflow-hidden bg-muted flex items-center justify-center">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setLogoPreview(null)}
                        className="absolute top-1 right-1 bg-destructive/90 hover:bg-destructive text-white p-1 rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border/50 bg-muted/30 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadLogo.isPending}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadLogo.isPending}
                      className="gap-2"
                    >
                      {uploadLogo.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload Logo
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                  Business Information
                </h3>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="businessName" className="text-sm font-medium">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="registrationNumber" className="text-sm font-medium">
                      Registration Number *
                    </Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      placeholder="Enter registration number"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your business address"
                      rows={3}
                      className="mt-1 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Contact Numbers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Numbers
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddContactNumber}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Number
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.contactNumbers.map((number, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          type="tel"
                          value={number}
                          onChange={(e) => handleContactNumberChange(index, e.target.value)}
                          placeholder="Enter contact number"
                        />
                      </div>
                      {formData.contactNumbers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveContactNumber(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Email Addresses */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Addresses
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddEmail}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Email
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.emailAddresses.map((email, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => handleEmailChange(index, e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      {formData.emailAddresses.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveEmail(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setLogoPreview(profile?.logo || null);
                  }}
                  disabled={updateProfile.isPending || uploadLogo.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateProfile.isPending || uploadLogo.isPending}
                  className="gap-2"
                >
                  {updateProfile.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {updateProfile.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        /* View Mode */
        <div className="space-y-4">
          {/* Logo and Basic Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {profile?.logo ? (
                  <div className="w-32 h-32 rounded-lg border border-border/50 overflow-hidden bg-muted flex items-center justify-center shrink-0">
                    <img
                      src={profile.logo}
                      alt="Company logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-lg border border-border/50 bg-muted flex items-center justify-center shrink-0">
                    <Building2 className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Business Name</p>
                    <p className="text-2xl font-bold text-foreground">{profile?.businessName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Registration Number</p>
                    <p className="font-semibold text-foreground">{profile?.registrationNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Address</p>
              <p className="text-foreground whitespace-pre-wrap">{profile?.address}</p>
            </CardContent>
          </Card>

          {/* Contact Numbers */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Contact Numbers
              </h3>
              <div className="space-y-2">
                {profile?.contactNumbers && profile.contactNumbers.length > 0 ? (
                  profile.contactNumbers.map((number, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <p className="font-semibold text-foreground">{number}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No contact numbers added</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Email Addresses */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Addresses
              </h3>
              <div className="space-y-2">
                {profile?.emailAddresses && profile.emailAddresses.length > 0 ? (
                  profile.emailAddresses.map((email, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <p className="font-semibold text-foreground text-sm break-all">{email}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No email addresses added</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
