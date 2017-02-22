export class HeaderTop{
	PositionId: Number
	Text: string;
	Text_Eng: string;
	Alias: string;

	constructor(
		PositionId: Number,
		Text: string,
		Text_Eng: string,
		Alias: string,){
		this.PositionId = PositionId;
		this.Text = Text ;
		this.Text_Eng = Text_Eng ;
		this.Alias = Alias ;
	}
}