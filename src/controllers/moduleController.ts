// import Joi from 'joi';
// import { Request, Response } from 'express';
// import Module from '../models/Module';
// import mongoose from 'mongoose';


// const moduleSchema = Joi.object({
//     module_name: Joi.string().required(),
//     section_id: Joi.string().required(),
//     lessons: Joi.array().items(Joi.string().required()),
//     completed_by: Joi.array().items(Joi.string().required())
// });
// const modulesSchema = Joi.array().items(moduleSchema);

// export const createModule = async (req: Request, res: Response) => {
//     try {
//         const { error } = modulesSchema.validate(req.body);
//         if (error) {
//             return res.status(400).json({
//                 success: false,
//                 status: 400,
//                 message: error.details[0].message,
//             });
//         }
//         const modulesData = req.body;
//         const savedModules = [];

//         for (const moduleData of modulesData) {
//             const { module_name, section_id, lessons, completed_by } = moduleData;
//             const convertedLessons = lessons.map((id: string) => (id));
//             const convertedCompletedBy = completed_by.map((id: string) => new mongoose.Types.ObjectId(id));

//             const newModule = new Module({
//                 module_name,
//                 section_id,
//                 lessons: convertedLessons,
//                 completed_by: convertedCompletedBy,
//             });

//             const savedModule = await newModule.save();
//             savedModules.push(savedModule);
//         }

//         return res.status(201).json({
//             success: true,
//             status: 201,
//             message: 'Modules created successfully',
//             data: savedModules,
//         });
//     } catch (error: any) {
//         return res.status(500).json({
//             success: false,
//             status: 500,
//             message: error.message
//         });
//     }
// };



import { Request, Response } from 'express';
import Joi from 'joi';
import mongoose, { Types } from 'mongoose';
import Module, { IModule } from '../models/Module'; // Adjust the import path as per your project structure

// Define Joi schema for validation
const moduleSchema = Joi.object({
    module_name: Joi.string().required(),
    section_id: Joi.string().required(),
    lessons: Joi.array().items(Joi.string().required()),
    completed_by: Joi.array().items(Joi.string().required())
});

const modulesSchema = Joi.array().items(moduleSchema);

export const createModule = async (req: Request, res: Response) => {
    // try {
    //     // Validate request body against schema
    //     const { error } = modulesSchema.validate(req.body);
    //     if (error) {
    //         return res.status(400).json({
    //             success: false,
    //             status: 400,
    //             message: error.details[0].message,
    //         });
    //     }

    //     // Extract modules data from request body
    //     const modulesData: IModule[] = req.body;
    //     const savedModules: IModule[] = [];

    //     // Iterate over each module data and save to database
    //     for (const moduleData of modulesData) {
    //         const { module_name, section_id, lessons, completed_by } = moduleData;

    //         // Ensure section_id is a string (if needed), or keep as ObjectId

    //         // Create new module instance
    //         const newModule = new Module({
    //             module_name,
    //             section_id: convertedSectionId,
    //             lessons: convertedLessons,
    //             completed_by: convertedCompletedBy,
    //         });

    //         // Save module to database
    //         const savedModule = await newModule.save();
    //         savedModules.push(savedModule);
    //     }

    //     return res.status(201).json({
    //         success: true,
    //         status: 201,
    //         message: 'Modules created successfully',
    //         data: savedModules,
    //     });
    // } catch (error: any) {
    //     return res.status(500).json({
    //         success: false,
    //         status: 500,
    //         message: error.message
    //     });
    // }
};




// Get All Modules
export const getAllModules = async (req: Request, res: Response) => {
    try {
        const modules = await Module.find();
        return res.status(200).json({
            success: true,
            status: 200,
            data: modules,
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, status: 500, message: error.message });
    }
};

// Get module by id
export const getModuleById = async (req: Request, res: Response) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ success: false, status: 404, message: 'Module not found' });
        }
        return res.status(200).json({
            success: true,
            status: 200,
            data: module,
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, status: 500, message: error.message });
    }
};

// update module
export const updateModuleById = async (req: Request, res: Response) => {
    try {
        const { error } = modulesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: error.details[0].message,
            });
        }

        const { module_name, section_id, lessons, completed_by } = req.body;

        const updatedModule = await Module.findByIdAndUpdate(
            req.params.id,
            {

                module_name,
                section_id,
                lessons,
                completed_by,
            },
            { new: true }
        );

        if (!updatedModule) {
            return res.status(404).json({ success: false, status: 404, message: 'Module not found' });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: 'Module updated successfully',
            data: updatedModule,
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, status: 500, message: error.message });
    }
};

// Delete module by id
export const deleteModuleById = async (req: Request, res: Response) => {
    try {
        const deletedModule = await Module.findByIdAndDelete(req.params.id);
        if (!deletedModule) {
            return res.status(404).json({ success: false, status: 404, message: 'Module not found' });
        }
        return res.status(200).json({
            success: true,
            status: 200,
            message: 'Module deleted successfully',
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, status: 500, message: error.message });
    }
};
