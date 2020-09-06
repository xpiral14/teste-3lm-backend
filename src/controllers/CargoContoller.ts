import { Request, Response, NextFunction } from "express";
import { Cargo } from "../models/Cargo";
import NotFoundException from "../exceptions/NotFound";
export default class CargoContoller {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const cargos = await Cargo.findAll();

      return res.json(cargos);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const cargo = await Cargo.findByPk(req.params.id);

      if (!cargo) throw new NotFoundException();


      return res.json(cargo)
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const cargo = await Cargo.findByPk(req.params.id);
      const { body } = req;

      if (!cargo) throw new NotFoundException();

      await cargo.update(body);
      await cargo.reload();

      return res.json(cargo);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const cargo = await Cargo.findByPk(req.params.id);

      if (!cargo) throw new NotFoundException();

      await cargo.destroy();

      return res.json();
    } catch (error) {
      return next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const cargo = await Cargo.create(body);

      return res.json(cargo);
    } catch (error) {
      return next(error);
    }
  }
}
