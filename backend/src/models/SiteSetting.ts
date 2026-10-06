import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  tiktok?: string;
}

export interface ISiteSetting extends Document {
  siteTitle: string;
  siteDescription: string;
  socialLinks: ISocialLinks;
  contactEmail: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingSchema = new Schema<ISiteSetting>(
  {
    siteTitle: {
      type: String,
      required: true,
      default: 'Abdalle Hussein | Full-Stack Developer',
      trim: true,
    },
    siteDescription: {
      type: String,
      required: true,
      default:
        'Portfolio of Abdalle Hussein, a Computer Science graduate and Full-Stack Developer based in Mogadishu, Somalia.',
      trim: true,
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com/Abdalle13' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      tiktok: { type: String, default: 'https://tiktok.com' },
    },
    contactEmail: {
      type: String,
      default: 'contact@abdalle.dev',
      trim: true,
    },
    footerText: {
      type: String,
      default: '© Abdalle Hussein. All rights reserved.',
      trim: true,
    },
    seoTitle: {
      type: String,
      default: 'Abdalle Hussein | Full-Stack Developer',
      trim: true,
    },
    seoDescription: {
      type: String,
      default:
        'Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems.',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSetting: Model<ISiteSetting> =
  mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', siteSettingSchema);
