import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HomeService from "App/Services/HomeService";
import {inject} from "@adonisjs/fold/build";

@inject([HomeService])
export default class HomeController {
  private service: HomeService;

  constructor(service: HomeService) {
    this.service = service;
  }

  public async index({view} : HttpContextContract) {
    return view.render('home/index', {
      title : this.service.title()
    })
  }
}
