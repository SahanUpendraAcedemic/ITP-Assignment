import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';



const lostItemReportsSchema = new mongoose.Schema({
  reportId: {
    type: String,
    default: `LIR${uuidv4().substr(0, 3)}`,
    unique: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  overallVariance: {
    type: Number,
    required: true
  },
  downloadLink: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const LostItemReports = mongoose.model('LostItemReport', lostItemReportsSchema);

export default LostItemReports;
