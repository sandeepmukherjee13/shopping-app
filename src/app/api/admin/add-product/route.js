import connectToDB from '@/database';
import Product from '@/models/product';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required()
});

//export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    await connectToDB();
    // check user is authenticated or not and the user is admin user or not
    //create a middleware which will check user is auth user or not and check user is admin user or not
    const user = 'admin';
    if (user === 'admin') {
      const extractData = await req.json();
      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop
      } = extractData;
      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message
        });
      }
      //create or save the data in our database
      const newlyCreatedProduct = await Product.create(extractData);

      //if true success is true and product will be added successsfully
      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: 'Product Added  Successfully'
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to add the Product please try again'
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not Authorised!'
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please Try Again Later'
    });
  }
}
