export interface CreatePostDto {
  title: string;
  content: string;
  ongId: number;
  jobTypeId: number;
}
export interface AssignToAssistantDto {
  postId: string;
  assistantId: number;
}
