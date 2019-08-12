json.array! @users.each do |user|
    json.partial! 'api/users/user.json.jbuilder', user: user
end