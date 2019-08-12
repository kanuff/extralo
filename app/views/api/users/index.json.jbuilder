json.array! do
    json.partial! 'api/users/user.json.jbuilder', user: @user
end