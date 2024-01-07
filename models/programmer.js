import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DevSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Insert your name']
    },
    tech: {
        type: [String],
        required: [true, 'Please select you technologies']
    },
    free: {
        type: Boolean,
        default: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

DevSchema.index({ location: '2dsphere' });

const Dev = mongoose.model('Dev', DevSchema);

export default Dev;