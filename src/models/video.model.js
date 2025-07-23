import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // URL to the video file
            required: true
        },
        thumbnail: {
            type: String, // URL to the video thumbnail image
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, // Duration of the video in seconds
            required: true
        },
        views: {
            type: Number,
            default: 0 // Default view count is 0
        },
        isPublished: {
            type: Boolean,
            default: true // Default is published
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true // Automatically manage createdAt and updatedAt fields
    }
)

videoSchema.plugin(mongooseAggregatePaginate); // Add pagination plugin

export const Video = mongoose.model("Video", videoSchema);