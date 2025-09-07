"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search, Filter, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface Admin {
    full_name: string;
    username: string;
    email: string;
    role: string;
    is_active: boolean;
}

export default function StudentsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const storedRole = localStorage.getItem('adminRole');
    setCurrentUserRole(storedRole);
    fetchAdmins();
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/all-admin`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch admins');
      }

      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load admins",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdateAdmin = async (adminData: Admin) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/admin/verify-admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ username: adminData.username })
      })

      if (!response.ok) {
        throw new Error('Failed to update admin');
      }

      toast({
        title: "Success",
        description: "Admin updated successfully",
      });

      // Refresh student list
      fetchAdmins();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update Admin",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDeleteAdmin = async (username: string) => {
    try {
      const response = await fetch(`${API_URL}/admin/delete-admin/${username}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to delete admin');
      }

      toast({
        title: "Success",
        description: "Admin deleted successfully",
      });

      // Refresh admin list
      fetchAdmins();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete admin",
        variant: "destructive"
      });
    }
  };

  const handlePasswordUpdate = async (username: string, newPassword: string) => {
    setIsUpdatingPassword(true);
    try {
      const response = await fetch(`${API_URL}/admin/update-admin-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ username, new_password: newPassword })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to update password');
      }

      toast({
        title: "Success",
        description: "Admin password updated successfully",
      });

      setIsPasswordDialogOpen(false);
      setNewPassword('');
      setSelectedAdmin(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };


  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">Admins</h1>
            <p className="text-gray-600">Manage and view all admin</p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : admins.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No admin found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admins.map((admin) => (
              <Card key={admin.username} className="p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{admin.full_name}</h3>
                    <p className="text-sm text-gray-500">{admin.username}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-sm ${
                      admin.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.is_active ? 'Active' : 'Inactive'}
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            admin account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-700"
                            onClick={() => handleDeleteAdmin(admin.username)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm"><span className="font-medium">Role:</span> {admin.role}</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> {admin.email}</p>
                </div>

                {!admin.is_active && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleUpdateAdmin(admin)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verifying' : 'Verify Admin'}
                  </Button>
                )}

                {currentUserRole === 'admin' && (
                  <div className="flex gap-2">
                    {!admin.is_active && (
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleUpdateAdmin(admin)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Verifying' : 'Verify Admin'}
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setIsPasswordDialogOpen(true);
                      }}
                    >
                      Change Password
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Reset Admin Password Modal */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Admin Password</DialogTitle>
              <DialogDescription>
                Set a new password for {selectedAdmin?.full_name}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (selectedAdmin) {
                handlePasswordUpdate(selectedAdmin.username, newPassword);
              }
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsPasswordDialogOpen(false);
                    setNewPassword('');
                    setSelectedAdmin(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdatingPassword}>
                  {isUpdatingPassword ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
