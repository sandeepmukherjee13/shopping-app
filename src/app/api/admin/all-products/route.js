import connectToDB from '@/database';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectToDB();

    const user = 'admin';
    if (user === 'admin') {
      const extractAllproducts = await Product.find({});
      if (extractAllproducts) {
        return NextResponse.json({
          success: true,
          data: extractAllproducts
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: 'No Products Found'
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are Not Authorized'
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something Went Wrong'
    });
  }
}
