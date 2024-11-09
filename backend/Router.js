const express = require('express');
const multer = require('multer');
const Product = require('./Schema');
const Mobile=require('./Mobileschema')
const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     console.log('in')
//     const {
//       title,
//       details,
// description,
// productAvailable,
// price,
// rating,
// categories,
// colorOptions,
// size,
// launchDate,
// tags,
// stockQuantity
//     } = req.body
//     console.log(req.body)
//     let detailsArray = JSON.parse(details)
//     console.log(detailsArray,'da')
//     let imagePath=req.file.path
//     let add = new Product(
//       {
//         title: title,
//         details:detailsArray,
//         description,
//         image:imagePath,
// productAvailable,
// price,
// rating,
// categories,
// colorOptions,
// size,
// launchDate,
// tags,
// stockQuantity

//       }
//     )
//     await add.save()
//     console.log(add)
//     return res.status(201).json({message:'Product Added Successfully',add})
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.post('/', upload.single('image'), upload.array('productImages'),async (req, res) => {
//   // Manually rebuild nested arrays and objects
//   try {
//     // // Initialize arrays
//     //for chceking formdata in backend this is right code in postman
//     // const details = [];
//     // const colorOptions = [];
      
//     // // Process details array
//     // let index = 0;
//     // while (req.body[`details[${index}].key`] !== undefined) {
//     //   details.push({
//     //     key: req.body[`details[${index}].key`],
//     //     value: req.body[`details[${index}].value`]
//     //   });
//     //   index++;
//     // }
      
//     // // Process categories array
//     // index = 0;
//     // while (req.body[`colorOptions[${index}].color`] !== undefined) {
//     //   colorOptions.push({
//     //     color: req.body[`colorOptions[${index}].color`]
//     //   });
//     //   index++;
//     // }
    
//     if (!req.body) {
//       throw new Error('Request body is undefined');
//     }
      
//     // Build product data
//     //for checking and integration in frontend this code is right
//     let { details ,colorOptions } = req.body
//     details = JSON.parse(details);
//     colorOptions = JSON.parse(colorOptions);
//     console.log(req.file)
//     const productData = {
//       title: req.body.title,
//       details,
//       colorOptions,
//       image:req.file.path,
//       description: req.body.description,
//       productAvailable: req.body.productAvailable === 'true', // Convert to boolean
//       price: parseFloat(req.body.price), // Convert to number //
//       rating: parseInt(req.body.rating), // Convert to number
//       categories: req.body.categories,
//       size: req.body.size,
//       launchDate: new Date(req.body.launchDate), // Convert to date
//       tags: req.body.tags,
//       stockQuantity: parseInt(req.body.stockQuantity),// Convert to number
//       productImages:req.files.map(file =>file.path)
//     };
  
//     // Save product
//     const product = new Product(productData);
//     console.log(productData)
//     await product.save();
//   console.log(product)
//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (error) {
//     res.status(500).json({ error: error.message});
//   }
  
// })

router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'productImages', maxCount: 10 } 
]), async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('Request body is undefined');
    }

    // Parse JSON fields
    let { details, colorOptions ,productQuestions} = req.body;
    details = JSON.parse(details);
    colorOptions = JSON.parse(colorOptions);
    productQuestions=JSON.parse(productQuestions)
    const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [];
    const categories = req.body.categories ? req.body.categories.split(',').map(category => category.trim()) : [];
const productSpeciality=req.body.productSpeciality? req.body.productSpeciality.split(',').map(pro=>pro.trim()):[]
    // Construct product data
    const productData = {
      title: req.body.title,
      details,
      colorOptions,
      productQuestions,
      productSpeciality,
      image: req.files['image'] ? req.files['image'][0].path : null, // Handle single file
      description: req.body.description,
      productAvailable: req.body.productAvailable === 'true', // Convert to boolean
      price: parseFloat(req.body.price), // Convert to number
      rating: parseInt(req.body.rating), // Convert to number
      categories,
      size: req.body.size,
      launchDate: new Date(req.body.launchDate), // Convert to date
      tags,
      stockQuantity: parseInt(req.body.stockQuantity), // Convert to number
      productImages: req.files['productImages'] ? req.files['productImages'].map(file => file.path) : [] // Handle multiple files
    };

    // Save product
    const product = new Product(productData);
    console.log(productData);
    await product.save();
    console.log(product);

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', upload.fields([{ name: 'image', maxCount: 10, },{name:'productImages',maxCount:10}]) ,async (req, res) => {
  try {
    let isProduct = await Product.findById(req.params.id)
    if (!isProduct) {
      return res.status(404).json({message:'Product not found'})
    }
    // let details = []
    // let colorOptions = []
    
    // let index = 0
    // while(req.body[`details[${index}].key`] !== undefined)
    // {
    //   details.push({
    //     key: req.body[`details[${index}].key`],
    //     value:req.body[`details[${index}].value`]
        
    //   })
    //   index++
    // }

    // index = 0;
    // while (req.body[`colorOptions[${index}].color`] !== undefined) {
    //   colorOptions.push({
    //     color: req.body[`colorOptions[${index}].color`],
    //     hash: req.body[`colorOptions[${index}].hash`]
    //   });
    //   index++;
    // }
    let { details, colorOptions ,productQuestions} = req.body;
    details = JSON.parse(details);
    colorOptions = JSON.parse(colorOptions);
    productQuestions=JSON.parse(productQuestions)
    const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [];
    const categories = req.body.categories ? req.body.categories.split(',').map(category => category.trim()) : [];
const productSpeciality=req.body.productSpeciality? req.body.productSpeciality.split(',').map(pro=>pro.trim()):[]

    let imagePath = req.files['image']? req.files['image'][0].path : null
    let productUpdate = await Product.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      details: details,
      colorOptions: colorOptions,
      productQuestions,
      productSpeciality,
      image:imagePath,
      description: req.body.description,
      productAvailable: req.body.productAvailable === 'true', // Convert to boolean
      price: parseFloat(req.body.price), // Convert to number
      rating: parseInt(req.body.rating), // Convert to number
      categories,
      size: req.body.size,
      launchDate: new Date(req.body.launchDate), // Convert to date
      tags, 
      stockQuantity: parseInt(req.body.stockQuantity),
      productImages: req.files['productImages'] ? req.files['productImages'].map(file => file.path) : [] // Handle multiple files// Convert to number

    }, { new: true, update: true, runValidators: true })
    console.log(req.body,'req')
    console.log(productUpdate)
    return res.status(200).json({message:"Product updated successfully",productUpdate})
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
})

router.get('/', async (req, res) => {
  try {
    let products = await Product.find()
    console.log(products)
    return res.status(200).json({message:'All products',products})
  } catch (error) {
    return res.status(500).json({error:error.message})

  }
})

router.get('/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)
    console.log(product)
    return res.status(200).json({message:'A single product',product})
  } catch (error) {
    return res.status(500).json({error:error.message})

  }
})

router.delete('/:id', async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id)
    console.log(product)
    return res.status(200).json({message:'Product Deleted Successfully',products})
  } catch (error) {
    return res.status(500).json({error:error.message})

  }
})
router.post('/add', upload.array('images'), async (req, res) => {
  try {
    const display = []
    const cameras = []
    const others = []
    console.log(display,cameras,others)
    let index = 0
    while (req.body[`display[${index}].displayType`] !== undefined) {
      display.push({
        displayType: req.body[`display[${index}].displayType`],
        displaySize:req.body[`display[${index}].displaySize`]

      })
      index++
    }

     index = 0
    while (req.body[`cameras[${index}].front`] !== undefined) {
      cameras.push({
        front: req.body[`cameras[${index}].front`],
        back:req.body[`cameras[${index}].back`]

      })
      index++
    }

     index = 0
    while (req.body[`others[${index}].chargingType`] !== undefined) {
      others.push({
        chargingType: req.body[`others[${index}].chargingType`],
        sensors: req.body[`others[${index}].sensors`],
        networkType: req.body[`others[${index}].networkType`],
        waterResistant: req.body[`others[${index}].waterResistant`],
        androidVersion: req.body[`others[${index}].androidVersion`],
        warranty: req.body[`others[${index}].warranty`],

      })
      index++
    }
    let mobileDetails = {
      launchDate:req.body.launchDate,
processor:req.body.processor,
ram:req.body.ram,
storage:req.body.storage,
      price: req.body.price,
      display,
      cameras,
      others,
      images: req.files.map(file => file.path),


    }
    console.log(mobileDetails)
    const mobileAdd = new Mobile(mobileDetails)
    await mobileAdd.save()
    console.log(mobileAdd)
    res.status(201).json({ message: 'Mobile created successfully', mobileAdd });

  } catch (error) {
    res.status(500).json({ error: error.message});

  }
})


module.exports = router
