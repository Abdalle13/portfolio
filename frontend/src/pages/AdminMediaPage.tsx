import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  X,
  Loader2,
} from 'lucide-react';
import { adminMediaApi } from '@/services/api';
import type { MediaAsset } from '@/types';

export const AdminMediaPage: React.FC = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { data: mediaFiles = [], isLoading } = useQuery({
    queryKey: ['admin-media'],
    queryFn: adminMediaApi.getAll,
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => adminMediaApi.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      setUploadError(null);
    },
    onError: (err: Error) => {
      setUploadError(err.message || 'Upload failed.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (fileId: string) => adminMediaApi.delete(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      if (selectedAsset) setSelectedAsset(null);
    },
  });

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    setUploadError(null);
    uploadMutation.mutate(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const isImageFile = (type: string, name: string): boolean => {
    const imgExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'];
    const ext = name.split('.').pop()?.toLowerCase() || '';
    return type.includes('image') || imgExtensions.includes(ext);
  };

  const filteredMedia = mediaFiles.filter((asset) =>
    asset.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Media & Image Library
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Upload, optimize, and manage visual assets delivered via ImageKit CDN.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadMutation.isPending}
          className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm self-start sm:self-auto disabled:opacity-50"
        >
          {uploadMutation.isPending ? (
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 mr-1.5" />
          )}
          <span>Upload File</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 sm:p-10 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center space-y-3 ${
          isDragging
            ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/20 scale-[0.99]'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-primary-500/50'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto">
          {uploadMutation.isPending ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {uploadMutation.isPending ? 'Uploading to ImageKit CDN...' : 'Drop files here or click to browse'}
          </p>
          <p className="text-xs text-slate-400">
            Supports JPEG, PNG, WebP, SVG, GIF, and PDF (Max 10MB per file)
          </p>
        </div>
      </div>

      {/* Error alert */}
      {uploadError && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
          <span>{uploadError}</span>
          <button onClick={() => setUploadError(null)} className="p-1 text-rose-400 hover:text-rose-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media files by name..."
          className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
        {search && (
          <button onClick={() => setSearch('')} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Media Grid */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
            <span>Loading media library...</span>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="text-sm">No media files found. Upload your first asset above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((asset) => {
              const isImg = isImageFile(asset.fileType, asset.name);
              const isCopied = copiedId === asset.fileId;

              return (
                <div
                  key={asset.fileId}
                  className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 overflow-hidden shadow-sm hover:shadow-md hover:border-primary-500/50 transition-all flex flex-col justify-between"
                >
                  {/* Visual preview */}
                  <div
                    onClick={() => setSelectedAsset(asset)}
                    className="aspect-square w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    {isImg ? (
                      <img
                        src={asset.thumbnailUrl || asset.url}
                        alt={asset.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 space-y-1">
                        <FileText className="w-8 h-8 text-primary-500" />
                        <span className="text-[10px] font-mono uppercase">{asset.fileType}</span>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="p-3 space-y-2">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={asset.name}>
                      {asset.name}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{formatFileSize(asset.size)}</span>
                      <span className="uppercase">{asset.fileType}</span>
                    </div>

                    {/* Actions bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <button
                        onClick={() => copyToClipboard(asset.url, asset.fileId)}
                        className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                          isCopied
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600'
                        }`}
                        title="Copy direct URL"
                      >
                        {isCopied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-slate-400 hover:text-primary-600 transition-colors"
                          title="Open original"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${asset.name}"?`)) {
                              deleteMutation.mutate(asset.fileId);
                            }
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Inspection Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate pr-6">
                {selectedAsset.name}
              </h3>
              <button onClick={() => setSelectedAsset(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview */}
            <div className="w-full rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden max-h-96">
              {isImageFile(selectedAsset.fileType, selectedAsset.name) ? (
                <img
                  src={selectedAsset.url}
                  alt={selectedAsset.name}
                  className="w-full h-auto max-h-96 object-contain"
                />
              ) : (
                <div className="py-16 text-center space-y-2">
                  <FileText className="w-16 h-16 text-primary-500 mx-auto" />
                  <p className="text-sm text-slate-500">Document Asset</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="text-slate-400 block">File Size:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatFileSize(selectedAsset.size)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Type:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">{selectedAsset.fileType}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Provider:</span>
                <span className="font-semibold text-primary-600">ImageKit CDN</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  if (window.confirm('Delete this asset?')) {
                    deleteMutation.mutate(selectedAsset.fileId);
                  }
                }}
                className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                <span>Delete Asset</span>
              </button>

              <button
                onClick={() => copyToClipboard(selectedAsset.url, selectedAsset.fileId)}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
              >
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                <span>Copy ImageKit URL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
