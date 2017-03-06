export class HeaderTop{
	PositionId: number
	Text: string;
	Text_Eng: string;
	Alias: string;

	constructor(
		PositionId: number,
		Text: string,
		Text_Eng: string,
		Alias: string,){
		this.PositionId = PositionId;
		this.Text = Text ;
		this.Text_Eng = Text_Eng ;
		this.Alias = Alias ;
	}
}