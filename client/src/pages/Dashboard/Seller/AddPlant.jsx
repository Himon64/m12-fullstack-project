import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/utils";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage,setUploadedImage] = useState(null);
  const [imageUploadError,setImageUploadError] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const from = e.target;
    const name = from?.name?.value;
    const category = from?.category?.value;
    const description = from?.description?.value;
    const price = from?.price?.value;
    const quantity = from?.quantity?.value;

    try {  
      const plantData = {
        name,
        category,
        description,
        price:parseFloat(price),
        quantity:parseInt(quantity),
        image: uploadedImage,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image:user?.photoURL,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-plant`,
        plantData
      );
      toast.success('plant data added successfully.yee');
      from.reset();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    finally{
      setIsUploading(false)
    }
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e?.target?.files[0]
    try{
      const imageUrl = await imageUpload(image);
    setUploadedImage(imageUrl);
    }
    catch(err){
      setImageUploadError('image upload failed');
      console.error(err);
    }
  }
  return (
    <div>
      {/* Form */}
      <AddPlantForm
       handleFormSubmit={handleFormSubmit}
      isUploading={isUploading}
      handleImageUpload={ handleImageUpload}
      uploadedImage={uploadedImage}
      imageUploadError={imageUploadError}
      />
    </div>
  );
};

export default AddPlant;
