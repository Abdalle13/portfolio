import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  location: string;
  email: string;
  about: string;
  heroImage?: string;
  aboutImage?: string;
  cv?: string;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: [true, 'Profile name is required'],
      trim: true,
      default: 'Abdalle Hussein',
    },
    title: {
      type: String,
      required: [true, 'Profile title is required'],
      trim: true,
      default: 'Full-Stack Developer',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      default: 'Mogadishu, Somalia',
    },
    email: {
      type: String,
      required: [true, 'Profile email is required'],
      lowercase: true,
      trim: true,
      default: 'contact@abdalle.dev',
    },
    about: {
      type: String,
      required: [true, 'About description is required'],
      default:
        'I am a Computer Science graduate from Jamhuriya University of Science and Technology (JUST) and a Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems.',
    },
    heroImage: {
      type: String,
      default: '',
    },
    aboutImage: {
      type: String,
      default: '',
    },
    cv: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', profileSchema);
