import Link from "@src/core/link/model/Link";
import RepositoryLink from "@src/core/link/service/RepositoryLink";
import LinkModel from "../database/models/Link";

export default class RepositoryLinkMongoose implements RepositoryLink {
  async findByUserId(userId: string): Promise<Link[]> {
    const links = await LinkModel.find({
      userId,
    });
    return links.map((link) => link.toObject()) as Link[];
  }

  async createLink(link: Partial<Link>): Promise<Link> {
    const newLink = new LinkModel(link);
    await newLink.save();
    return newLink.toObject() as Link;
  }

  async getById(_id: string): Promise<Link> {
    console.log("GETBYID");
    const link = await LinkModel.findById({_id});
    return link?.toObject() as Link;
  }

  async deleteLink(_id: string): Promise<boolean> {
    await LinkModel.deleteOne({_id});
    console.log("Passando no Repository MOngoose");
    return true;
  }
}
