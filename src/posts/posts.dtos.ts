export interface CreatePostDto {
  title: string;
  content: string;
  ongId: number;
  startDate: string;
  finishDate: string;
}
export interface AssignToAssistantDto {
  postId: string;
  assistantId: number;
}
