import cloudinary from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Validation
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Images validation
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    if (req.files.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Maximum 3 images allowed",
      });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "products",
      })
    );

    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Create product
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, stock, category } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (category) product.category = category;

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      if (req.files.length > 3) {
        return res.status(400).json({
          success: false,
          message: "Maximum 3 images allowed",
        });
      }

      // Delete old images from Cloudinary
      if (product.images && product.images.length > 0) {
        const deletePromises = product.images.map((imageUrl) => {
          try {
            const splitUrl = imageUrl.split("/products/")[1];

            if (!splitUrl) return null;

            const publicId =
              "products/" + splitUrl.substring(0, splitUrl.lastIndexOf("."));

            return cloudinary.uploader.destroy(publicId);
          } catch {
            return null;
          }
        });

        await Promise.all(deletePromises.filter(Boolean));
      }

      // Upload new images
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "products",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);

      product.images = uploadResults.map((result) => result.secure_url);
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete Cloudinary images
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((imageUrl) => {
        try {
          const splitUrl = imageUrl.split("/products/")[1];

          if (!splitUrl) return null;

          const publicId =
            "products/" + splitUrl.substring(0, splitUrl.lastIndexOf("."));

          return cloudinary.uploader.destroy(publicId);
        } catch {
          return null;
        }
      });

      await Promise.all(deletePromises.filter(Boolean));
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "shipped", "delivered"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }

    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET ALL CUSTOMERS
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    const totalCustomers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
      },
    });
  } catch (error) {
    console.error("GET DASHBOARD STATS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};