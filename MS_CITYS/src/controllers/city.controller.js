import { getCitys, getCountryCitys } from "../models/cityModel.js";

export const getCitysController = async (req, res) => {
    try {
        const countrys = await getCitys();
        res.json(countrys);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getCountryCitysController = async (req, res) => {
    try {
        const { country_id } = req.params;
        const countrys = await getCountryCitys(country_id);
        res.json(countrys);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" ,error});
    }
};