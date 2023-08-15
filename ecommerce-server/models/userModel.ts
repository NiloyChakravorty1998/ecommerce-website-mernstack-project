    import mongoose from "mongoose";
    import bcrypt from 'bcryptjs'


    export interface UserDocument extends mongoose.Document {
        email: string;
        password: string;
        name: string;
        isAdmin: boolean;
        matchPassword(enteredPassword: string): Promise<boolean>;
    }

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }, {
        timestamps: true
    });

    userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    };

    const User = mongoose.model<UserDocument>('User', userSchema);
    export default User;