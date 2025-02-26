import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/kullanici.js'
import Yönetici from '../models/yönetici.js'
const Detay = async (req, res) => {
    const { email } = req.params;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const signin=async (req,res)=>{

    const {email,password}=req.body;

    try {

        const isim=await User.findOne({email})
    
        
        if(!isim) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const kullanici=await User.findOne({email})
    
        
        if(!kullanici) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const parolaKontrolSonuc=await bcrypt.compare(password,kullanici.password);

        if(!parolaKontrolSonuc) return res.status(400).json({message:'Parolayı doğru giriniz'})

        const token=jwt.sign({email:kullanici.email,id:kullanici._id},'aos-secret-code',{expiresIn:'30d'})

        res.status(200).json({result:kullanici,token})

    } catch (error) {

        res.status(500).json({message:'Bir hata oluştu'})
        
    }
}
const duzenle = async (req, res) => {
    const { email } = req.params; // Assuming email is in the params
    const updatedFields = req.body;
  
    try {
        // Find the user by email
        const user = await User.findOne({ email });
  
        // Check if the user exists
        if (!user) {
            return res.status(404).send("User not found");
        }
  
        // Update only the specified fields
        Object.assign(user, updatedFields);
  
        // Hash the password if it's provided in the request
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            user.password = hashedPassword;
        }
  
        // Save the updated user
        const updatedUser = await user.save();
  
        res.status(200).json(updatedUser);
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  };
const users=async (req,res)=>{

    try {
        const postMessage=await User.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const Delete = async (req, res) => {
    const { email } = req.params;
  
    try {
      // E-posta değerine göre kullanıcıyı bul
      const user = await User.findOne({ email });
  
      // Eğer kullanıcı bulunamazsa 404 hatası dön
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
  
      // Kullanıcıyı sil
      await User.findByIdAndRemove(user._id);
  
      // Başarılı yanıtı gönder
      res.status(200).json({ message: 'Kullanıcı silindi' });
    } catch (error) {
      console.error('Kullanıcı silme hatası:', error);
      res.status(500).json({ message: 'Bir hata oluştu' });
    }
  };

const yönetici=async (req,res)=>{

    const {email,password}=req.body;

    try {
        const kullanici=await Yönetici.findOne({email})

        if(!kullanici) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const parolaKontrolSonuc=await bcrypt.compare(password,kullanici.password);

        if(!parolaKontrolSonuc) return res.status(400).json({message:'Parolayı doğru giriniz'})

        const token=jwt.sign({email:kullanici.email,id:kullanici._id},'aos-secret-code',{expiresIn:'30d'})

        res.status(200).json({result:kullanici,token})

    } catch (error) {

        res.status(500).json({message:'Bir hata oluştu'})
        
    }
}
const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // Giriş verilerini loglayın
        console.log('Gelen veri:', { email, password, confirmPassword, firstName, lastName });

        const kullanici = await User.findOne({ email });

        if (kullanici) {
            console.log('Kullanıcı Zaten Bulunuyor');
            return res.status(400).json({ message: 'Kullanıcı Zaten Bulunuyor' });
        }

        if (password !== confirmPassword) {
            console.log('Parolalar uyuşmadı!');
            return res.status(400).json({ message: 'Parolalar uyuşmadı!' });
        }

        const sifrelenmisParola = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: sifrelenmisParola,
            firstName,
            lastName,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, 'aos-secret-key', { expiresIn: '30d' });

        console.log('Kullanıcı başarıyla oluşturuldu:', result);

        res.status(200).json({ result, token });
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        res.status(500).json({ message: 'Bir hata oluştu', error: error.message });
    }
};

// const getir=async (req,res)=>{

//     try {
//         const postMessage=await User.find();
//         res.status(200).json(postMessage)
     
//     } catch (error) {
//         res.status(404).json({message:error.message})
//     }
// }

export { signin, signup,yönetici,users,Delete,duzenle,Detay };