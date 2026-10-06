import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  level: string;
  degree: string;
  startYear: string;
  endYear: string;
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    level: {
      type: String,
      required: [true, 'Education level is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree / field of study is required'],
      trim: true,
    },
    startYear: {
      type: String,
      required: [true, 'Start year is required'],
      trim: true,
    },
    endYear: {
      type: String,
      required: [true, 'End year is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

educationSchema.index({ order: 1 });

export const Education: Model<IEducation> =
  mongoose.models.Education || mongoose.model<IEducation>('Education', educationSchema);
