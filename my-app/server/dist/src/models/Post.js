import mongoose from 'mongoose';
;
;
const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    anonymous: {
        type: Boolean,
        required: true,
    }
});
const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    anonymous: {
        type: Boolean,
        required: true,
    },
    likes: {
        type: [String],
        default: [],
        required: true,
    },
    comments: {
        type: [commentSchema],
        default: [],
    }
});
export const Post = mongoose.model('Post', postSchema);
export const Comment = mongoose.model('Comment', commentSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvUG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQXFDLE1BQU0sVUFBVSxDQUFDO0FBZWhCLENBQUM7QUFDSyxDQUFDO0FBQ3BELE1BQU0sYUFBYSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBVztJQUNoRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDLENBQUE7QUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQVE7SUFDMUMsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNkLE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDckIsT0FBTyxFQUFFLEVBQUU7S0FDZDtDQUNKLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFvQixNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDMUUsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQTBCLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyJ9