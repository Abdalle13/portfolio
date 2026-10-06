import mongoose, { Document, Schema, Model } from 'mongoose';

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools & Platforms';

export interface ISkill extends Document {
  name: string;
  category: SkillCategory;
  icon: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Frontend', 'Backend', 'Database', 'Tools & Platforms'],
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

skillSchema.index({ category: 1, order: 1 });
skillSchema.index({ active: 1 });

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', skillSchema);
