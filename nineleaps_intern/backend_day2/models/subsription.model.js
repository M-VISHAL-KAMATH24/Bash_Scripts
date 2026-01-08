import mongoose from 'mongoose';

const subscriptionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'subsription name is required'],
        trim:true,
        minlength:5,
        maxlength:100,
    },
    price:{
        type:Number,
        required:[true,'subsription price is required'],
        min:[0,'price must be greater than 0']
    },
    currency:{
        type:String,
        enum:['USD','EUR','RUP'],
        default:USD
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly']
    },
    category:{
        type:String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','politics','others'],
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<=new Date();
            message:'start date must be in the past'
        }
    },
    renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(value)
            { return value >this.startDate;},
            message:'start date must be in the past'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }
},{timestamps:true});

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency])
    }
    if(this.renewalDate<new Date()){
        this.status='expire';
    }
    next();
})

const Subsriptions=mongoose.model('Subsriptions',subscriptionSchema);
export default Subsriptions;