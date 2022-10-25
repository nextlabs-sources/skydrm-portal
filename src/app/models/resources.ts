export class WebResource {
  datasheets: LinkRes;
  whitePapers: LinkRes;

  fromJson(data: any): void {
    this.datasheets = new LinkRes();
    this.datasheets.fromJson(data["datasheets"]);

    this.whitePapers = new LinkRes();
    this.whitePapers.fromJson(data["whitePapers"]);
  }
}

export class LinkRes {
  title: string;
  list: Link[];

  fromJson(data: any): void {
    this.title = data["title"] ?? "";
    let loop = data["list"] ?? [];

    this.list = [];
    loop.forEach((val) => {
      let rec = new Link();
      rec.fromJson(val);
      this.list.push(rec);
    });
  }
}

/**
 * @deprecated The class should not be used
 */
export class OldVideo {
  title: string;
  desc: string;
  video_id: string;
  video_url: string;
  backgroundImage: string;
  thumbnail: string;
  image_url: string;

  fromJson(data: any): void {
    this.title = data["title"] ?? "";
    this.desc = data["desc"] ?? "";
    this.video_id = data["video_id"] ?? "";

    this.thumbnail = "url(//img.youtube.com/vi/" + this.video_id + "/0.jpg)";
    this.image_url = "https://img.youtube.com/vi/" + this.video_id + "/0.jpg";
    this.video_url =
      "https://www.youtube.com/embed/" + this.video_id + "?showinfo=0";
  }
}

export class Link {
  title: string;
  desc: string;
  link: string;
  backgroundImage: string;

  fromJson(data: any): void {
    this.title = data["title"] ?? "";
    this.desc = data["desc"] ?? "";
    this.link = data["link"] ?? "";
  }
}

export class PlayList {
  title: string = "";
  list: Video[] = [];

  fromJson(data: any): void {
    this.title = data["title"] ?? "";
    let loop = data["list"] ?? [];

    this.list = [];
    loop.forEach((element: any) => {
      let rec = new Video();
      rec.fromJson(element);
      this.list.push(rec);
    });
  }
}

export class Video {
  title: string = "";
  desc: string = "";
  video_id: string = "";
  video_url: string = "";
  backgroundImage: string = "";
  thumbnail: string = "";
  image_url: string = "";

  fromJson(data: any): void {
    this.title = data["title"] ?? "";
    this.desc = data["desc"] ?? "";
    this.video_id = data["video_id"] ?? "";

    this.thumbnail = "url(//img.youtube.com/vi/" + this.video_id + "/0.jpg)";
    this.image_url = "https://img.youtube.com/vi/" + this.video_id + "/0.jpg"; //maxresdefault
    this.video_url =
      "https://www.youtube.com/embed/" + this.video_id + "?showinfo=0";
  }
}
