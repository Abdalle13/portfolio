import mongoose, { Document, Schema, Model } from 'mongoose';

export type MessageStatus = 'unread' | 'read' | 'archived';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  read: boolean;
  status: MessageStatus;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Sender email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'archived'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ createdAt: -1 });
messageSchema.index({ read: 1, status: 1 });

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);
