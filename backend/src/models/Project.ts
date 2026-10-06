import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      required: [true, 'Technologies are required'],
      default: [],
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
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

// Indexes for performance and sorting
projectSchema.index({ published: 1, featured: 1, order: 1 });
projectSchema.index({ order: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);
