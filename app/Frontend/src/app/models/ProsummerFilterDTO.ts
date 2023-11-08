export class ProsummerFilterDTO {
    public page: number;
    public searchBarText: string;
    public jbmgSearch: string;
    public brLkSearch: string;
    public countySearch: string;
    public citySearch: string;

    constructor() {
      this.page = 1;
      this.searchBarText = '';
      this.jbmgSearch = '';
      this.brLkSearch = '';
      this.countySearch = '';
      this.citySearch = '';
  }
}