import {Schema} from "mongoose";
import {INotification} from "@/types/INotification";
import mongoose from "mongoose";
import {Activity} from "@/lib/util/activitySchema";

export interface INotificationModel extends INotification, Document {}

const NotificationSchema: Schema = new mongoose.Schema<INotificationModel>({

        host: {
            email: {
                type: String,
                required: [true, 'Email must be provided']
            },
            name: {
                type: String,
                required: [true, 'Name must be provided']
            },
        },
        sender: {
            email: {
                type: String,
                required: [true, 'Sender email must be provided']
            },
            name: {
                type: String,
                required: [true, 'Sender name must be provided']
            },
        },
        activity_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Activity
        },
        replied: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: true
        }
    }
)

export const Notifications = mongoose.models.Notifications || mongoose.model<INotificationModel>('Notifications', NotificationSchema, 'Notifications')