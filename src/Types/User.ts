export type Group = "ADMIN" | "GUIDE" | "NORMAL"

export type UserData = {
    username: string,
    password: string,
    email: string,
    group: Group,
    photo_uri?: string
    fcm_token?: string
}

export type UserType = {
    username: string,
    group: Group,
    photo_uri?: string,
    token: string,
    refresh: string
}

export type UserContextType = {
    user: UserType | null
    setUser: ((user:UserType)=>void) | null
}

export type UserCredentials = {
    username: string;
    password: string;
}
