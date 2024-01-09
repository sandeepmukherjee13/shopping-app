import connectToDB from '@/database';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    const {
      _id,
      name,
      price,
      description,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl
    } = extractData;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: _id },
      {
        name,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl
      },
      { new: true }
    );
    if (updatedProduct) {
      return NextResponse.json({
        success: true,
        message: 'Product Updated Successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to Update Please try again later'
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong please try agin later'
    });
  }
}
