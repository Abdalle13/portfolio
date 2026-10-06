import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ order: 1 });
serviceSchema.index({ active: 1 });

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);
