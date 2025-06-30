export interface IStartConversationResponse {
    callback_url: string;
    conversation_id: string;
    conversation_name: string;
    conversation_url: string;
    created_at: string;
    status: string;
}

export interface ICalBookArgs {
    user_name : string,
    user_email : string,
    user_phone : string,
    start_time: string,
    duration: number,
    response_to_user: string
}